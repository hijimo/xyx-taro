import React from 'react';
import { TagGroupProps } from './group';

const TagGroupContext = React.createContext<TagGroupProps | null>(null);

export const TagGroupContextProvider = TagGroupContext.Provider;

export default TagGroupContext;
