import {
  ParameterHeight,
  ParameterWidth,
} from 'features/parameters/types/parameterSchemas';
import { z } from 'zod';

export const zAspectRatioID = z.enum([
  'Free',
  '16:9',
  '3:2',
  '4:3',
  '1:1',
  '3:4',
  '2:3',
  '9:16',
]);
export type AspectRatioID = z.infer<typeof zAspectRatioID>;
export const isAspectRatioID = (v: string): v is AspectRatioID =>
  zAspectRatioID.safeParse(v).success;

export type ImageSizeState = {
  aspectRatioID: AspectRatioID;
  aspectRatio: number;
  width: ParameterWidth;
  height: ParameterHeight;
  isLocked: boolean;
};
