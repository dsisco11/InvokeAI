import { ParamSeedNumberInput } from './ParamSeedNumberInput';
import { ParamSeedRandomize } from './ParamSeedRandomize';
import { ParamSeedShuffle } from './ParamSeedShuffle';

export const ParamSeed = () => {
  return (
    <>
      <ParamSeedNumberInput />
      <ParamSeedShuffle />
      <ParamSeedRandomize />
    </>
  );
};
