import { Divider, Flex, Typography } from 'antd';
import { ThemeControls } from '../theme/ThemeControls';
import { useResolvedColorMode } from '../theme/useResolvedColorMode';
import { ColorMode } from '../theme/theme.types';
import { CoverageProvider } from './Specimen';
import { DeltaTable } from './DeltaTable';
import { useDemoStyles } from './useDemoStyles';
import { Foundations } from './sections/Foundations';
import { General } from './sections/General';
import { Navigation } from './sections/Navigation';
import { DataEntry } from './sections/DataEntry';
import { DataDisplay } from './sections/DataDisplay';
import { Feedback } from './sections/Feedback';
import { TextAccessibility } from './sections/TextAccessibility';

const { Title, Text, Paragraph } = Typography;

const TOOLBAR_GAP = 12;

export const ThemeDemo = () => {
    const { styles } = useDemoStyles();
    const resolvedColorMode = useResolvedColorMode();

    return (
        <CoverageProvider>
            <div className={styles.scroller}>
                <div className={styles.toolbar}>
                    <Flex align="center" gap={TOOLBAR_GAP} wrap>
                        <ThemeControls />

                        <Divider orientation="vertical" />

                        <Text type="secondary">
                            left column: this theme · right column: stock Ant Design in{' '}
                            {resolvedColorMode === ColorMode.Dark ? 'dark' : 'light'} mode
                        </Text>
                    </Flex>
                </div>

                <div className={styles.page}>
                    <Title level={2}>Theme demo</Title>
                    <Paragraph type="secondary">
                        Everything below is stock Ant Design plus the overrides in this custom theme. Each card puts the
                        two side by side — this theme on the left, Ant Design on its own on the right — and says what
                        changed and what to look for. Cards for a size the design export pins add a third column showing
                        what our raised control scale would have derived without that pin.
                    </Paragraph>

                    <Title level={3}>What changed</Title>
                    <DeltaTable />

                    <Divider />

                    <Foundations />
                    <General />
                    <Navigation />
                    <DataEntry />
                    <DataDisplay />
                    <Feedback />
                    <TextAccessibility />
                </div>
            </div>
        </CoverageProvider>
    );
};
