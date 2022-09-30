import _toPairs from 'lodash/toPairs';
import _map from 'lodash/map';
import _flattenDeep from 'lodash/flattenDeep';
import { Base64 } from 'js-base64';

export type RuleValue = string | number | Array<string | number>;

export interface ImageProcessRule {
  [key: string]: RuleValue;
}

export const defaultRule: ImageProcessRule = {
  resize: ['w_800', 'h_800'],
  format: 'jpg',
  interlace: 1,
  quality: ['Q_80'],
};

export const defaultWatermarkRule = {
  resize: 'P_30',
};

export const ossImageProcess = (
  url: string | null,
  rule: ImageProcessRule = defaultRule,
): string => {
  if (url === null || url === '') {
    return '';
  }
  const ruleString = _map(_toPairs(rule), pair => _flattenDeep(pair).join(',')).join('/');
  return `${url}?x-oss-process=image/${ruleString}`;
};

export const ossVideoSnapshot = (url: string | null, time: number = 0) => {
  return `${url}?x-oss-process=video/snapshot,t_${time},f_jpg,w_0,h_0,m_fast`;
};

export const watermarkProcess = (
  mainImageUrl: string,
  mainImageRule: ImageProcessRule | null,
  watermarkKey: string,
  watermarkRule: ImageProcessRule = defaultWatermarkRule,
) => {
  const watermarkString = ossImageProcess(watermarkKey, watermarkRule);
  const base64WatermarkString = Base64.encodeURI(watermarkString);
  const rule = {
    watermark: `image_${base64WatermarkString},g_south,y_300`,
    ...mainImageRule,
  };
  return ossImageProcess(mainImageUrl, rule);
};
