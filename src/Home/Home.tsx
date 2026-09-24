import { Button, Divider, Flex, Typography } from 'antd';
import { ThemeControls } from '../theme/ThemeControls';
import { useShowcaseStyles } from './useShowcaseStyles';
import { General } from './sections/General';
import { Navigation } from './sections/Navigation';
import { DataEntry } from './sections/DataEntry';
import { DataDisplay } from './sections/DataDisplay';
import { Feedback } from './sections/Feedback';

const { Title, Text, Paragraph } = Typography;

const TOOLBAR_GAP = 12;

const GROUPS = [
    { id: 'group-general', label: 'General' },
    { id: 'group-navigation', label: 'Navigation' },
    { id: 'group-data-entry', label: 'Data entry' },
    { id: 'group-data-display', label: 'Data display' },
    { id: 'group-feedback', label: 'Feedback' },
];

/* scrollIntoView rather than an href: the page lives in its own scroll container and a hash link
   would put a fragment on the route for a jump that is purely visual. */
const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export const Home = () => {
    const { styles } = useShowcaseStyles();

    return (
        <div className={styles.scroller}>
            <div className={styles.toolbar}>
                <Flex align="center" gap={TOOLBAR_GAP} wrap>
                    <ThemeControls />

                    <Divider orientation="vertical" />

                    <div className={styles.navLinks}>
                        {GROUPS.map((group) => (
                            <Button key={group.id} size="small" type="text" onClick={() => jumpTo(group.id)}>
                                {group.label}
                            </Button>
                        ))}
                    </div>
                </Flex>
            </div>

            <div className={styles.page}>
                <Title level={2}>Components</Title>
                <Paragraph type="secondary">
                    Every Ant Design component the app uses, rendered through this custom theme, with each variant
                    labelled. Nothing here is compared against stock Ant Design — for that, and for the reasoning behind
                    each override, see the <Text strong>Diff</Text> page. Cards carry a line on what the theme changed
                    where it changed anything, and an <Text strong>In the app</Text> note naming the variants the
                    product actually ships.
                </Paragraph>

                <Divider />

                <General />
                <Navigation />
                <DataEntry />
                <DataDisplay />
                <Feedback />
            </div>
        </div>
    );
};
