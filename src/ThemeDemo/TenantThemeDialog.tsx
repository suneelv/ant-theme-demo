import { useState } from 'react';
import { Button, ColorPicker, Flex, Modal, Tag, Typography } from 'antd';
import type { ColorSchema } from '../theme/theme.types';
import { DEFAULT_TENANT_COLORS } from '../theme/tenantDefaults';

const { Text, Paragraph } = Typography;

interface Field {
    key: keyof ColorSchema;
    label: string;
    /* buildTenantLightToken reads this one. The other two are commented out there, so editing
       them changes nothing until those TODOs are picked up. */
    consumed: boolean;
}

const FIELDS: Field[] = [
    { key: 'primary', label: 'Primary', consumed: true },
    { key: 'primaryFont', label: 'Primary font', consumed: true },
    { key: 'primaryBackground', label: 'Primary background', consumed: true },
    { key: 'secondaryFont', label: 'Secondary font', consumed: false },
    { key: 'secondaryBackground', label: 'Secondary background', consumed: false },
];

interface Props {
    colors: ColorSchema;
    onCancel: () => void;
    onSave: (colors: ColorSchema) => void;
}

export const TenantThemeDialog = ({ colors, onCancel, onSave }: Props) => {
    const [draft, setDraft] = useState<ColorSchema>(colors);

    return (
        <Modal
            open
            title="Configure tenant theme"
            okText="Apply"
            width={640}
            /* Header and footer stay put; only the field list scrolls, so Apply is always reachable. */
            styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
            onOk={() => onSave(draft)}
            onCancel={onCancel}
        >
            <Flex align="center" justify="space-between" gap={16}>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    Specify theme colors for tenant
                </Paragraph>
                <Button
                    size="small"
                    color="danger"
                    variant="outlined"
                    onClick={() => setDraft(DEFAULT_TENANT_COLORS)}
                >
                    Reset to default
                </Button>
            </Flex>

            <Flex vertical gap={16} style={{ marginTop: 16 }}>
                {FIELDS.map((field) => (
                    <Flex key={field.key} vertical gap={4} align="flex-start">
                        <Flex align="center" gap={8}>
                            <Text strong>{field.label}</Text>
                            {field.consumed ? null : <Tag color="warning">not consumed</Tag>}
                        </Flex>
                        <ColorPicker
                            value={draft[field.key]}
                            showText
                            onChange={(color) => setDraft((prev) => ({ ...prev, [field.key]: color.toHexString() }))}
                        />
                    </Flex>
                ))}
            </Flex>
        </Modal>
    );
};
