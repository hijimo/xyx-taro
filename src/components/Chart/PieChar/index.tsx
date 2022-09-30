import React, { useEffect, useRef } from "react";
import * as echarts from "@/components/Chart/ec-canvas/echarts";

interface Props {
  option: any;
}

const PieChar: React.FC<Props> = ({ option }) => {
  const echartRef = useRef();
  // 微信的canvas在组件里使用时需要组件的上下文this
  // 所以需要先包装成小程序组件再包一层react组件
  const handleInit = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr, // 像素
    });
    canvas.setChart(chart);
    echartRef.current = chart;
    chart.setOption(option);
    return chart;
  };
  useEffect(() => {
    if (option && echartRef.current) {
      echartRef.current.setOption(option);
    }
  }, [option]);
  return (
    <ec-canvas
      canvas-id="pie-canvas"
      ec={{
        onInit: handleInit,
      }}
      option={{
        canvasId: "pie-canvas",
        animation: true,
        ...option,
        type: "pie",
      }}
    />
  );
};

// PieChar.config = {
//   usingComponents: {
//     "ec-canvas": "../ec-canvas/ec-canvas",
//   },
// };
export default PieChar;
