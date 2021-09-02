import { camelCase, upperFirst } from 'lodash';

export const toPascalCase = (str: string): string => {
    return upperFirst(camelCase(str));
};

export const toCamelCase = (str: string): string => {
    return camelCase(str);
};
