import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Spacer,
  Tooltip,
} from '@chakra-ui/react';
import { useAppDispatch } from 'app/store/storeHooks';
import IAIIconButton from 'common/components/IAIIconButton';
import NodeSelectionOverlay from 'common/components/NodeSelectionOverlay';
import { useMouseOverNode } from 'features/nodes/hooks/useMouseOverNode';
import { workflowExposedFieldRemoved } from 'features/nodes/store/workflowSlice';
import { HANDLE_TOOLTIP_OPEN_DELAY } from 'features/nodes/types/constants';
import { memo, useCallback } from 'react';
import { FaInfoCircle, FaTrash } from 'react-icons/fa';
import EditableFieldTitle from './EditableFieldTitle';
import FieldTooltipContent from './FieldTooltipContent';
import InputFieldRenderer from './InputFieldRenderer';
import { useTranslation } from 'react-i18next';

type Props = {
  nodeId: string;
  fieldName: string;
};

const LinearViewField = ({ nodeId, fieldName }: Props) => {
  const dispatch = useAppDispatch();
  const { isMouseOverNode, handleMouseOut, handleMouseOver } =
    useMouseOverNode(nodeId);
  const { t } = useTranslation();
  const handleRemoveField = useCallback(() => {
    dispatch(workflowExposedFieldRemoved({ nodeId, fieldName }));
  }, [dispatch, fieldName, nodeId]);

  return (
    <Flex
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      layerStyle="second"
      sx={{
        position: 'relative',
        borderRadius: 'base',
        w: 'full',
        p: 2,
      }}
    >
      <FormControl as={Flex} sx={{ flexDir: 'column', gap: 1, flexShrink: 1 }}>
        <FormLabel
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 0,
          }}
        >
          <EditableFieldTitle
            nodeId={nodeId}
            fieldName={fieldName}
            kind="input"
          />
          <Spacer />
          <Tooltip
            label={
              <FieldTooltipContent
                nodeId={nodeId}
                fieldName={fieldName}
                kind="input"
              />
            }
            openDelay={HANDLE_TOOLTIP_OPEN_DELAY}
            placement="top"
            hasArrow
          >
            <Flex h="full" alignItems="center">
              <Icon as={FaInfoCircle} />
            </Flex>
          </Tooltip>
          <IAIIconButton
            aria-label={t('nodes.removeLinearView')}
            tooltip={t('nodes.removeLinearView')}
            variant="ghost"
            size="sm"
            onClick={handleRemoveField}
            icon={<FaTrash />}
          />
        </FormLabel>
        <InputFieldRenderer nodeId={nodeId} fieldName={fieldName} />
      </FormControl>
      <NodeSelectionOverlay isSelected={false} isHovered={isMouseOverNode} />
    </Flex>
  );
};

export default memo(LinearViewField);
