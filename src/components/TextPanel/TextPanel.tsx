import React from 'react';
import styles from './TextPanel.module.scss';

function TextPanel(content: any) {
    return (
        <div className={styles.homeTextPanel}>
            <div className={styles.homePanelContent}>
                {content.props.props.children}
            </div>
        </div>
    );
}

export default TextPanel;