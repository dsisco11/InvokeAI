import type { InvSelectOption, InvSelectProps } from 'common/components';
import { InvSelect } from 'common/components';

const options: InvSelectOption[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'inpaint', label: 'Inpaint' },
  { value: 'depth', label: 'Depth' },
];

type VariantSelectProps = Omit<InvSelectProps, 'options'>;

export default function ModelVariantSelect(props: VariantSelectProps) {
  return <InvSelect options={options} {...props} />;
}
