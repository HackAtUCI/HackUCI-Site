import sponsors from 'assets/data/sponsors.json';
import stickermuleSrc from 'assets/sponsors/stickermule.svg';
import Image from 'next/image';
import React from 'react';
import styles from './Sponsors.module.scss';

function Sponsors() {
    const stickermule = sponsors[4];

    console.log(stickermule);

    return (
        <section id="sponsors" className="container sponsors-block">
            <h2 className="text-center">Sponsors</h2>
            <div className={styles.sponsorInfo}>Interested in sponsoring HackUCI 2023? Check out our information above to
                                                learn more about our event! For more information, please email us at hack@uci.edu.</div>
            <div className={styles.sponsorImages}>
                <a key={stickermule.name} href={stickermule.url} className={styles.sponsorLink}>
                    <Image src={stickermuleSrc} alt={stickermule.name} className={styles.sponsorImage} />
                </a>
            </div>
        </section>
    );
}

export default Sponsors;