import panelImage from 'assets/images/landing_text_panel.svg';
import Image from 'next/image';
import React from 'react';
import styles from './TextPanel.module.scss';

function TextPanel() {
    return (
        <Image src={panelImage} alt="Text Panel" className={styles.homeBenchImage} />
    );
}

export default TextPanel;