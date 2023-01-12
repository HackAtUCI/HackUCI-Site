import FacebookIcon from "assets/icons/facebook_icon.svg";
import InstagramIcon from "assets/icons/instagram_icon.svg";
import LinkedInIcon from "assets/icons/linkedin_icon.svg";
import MailIcon from "assets/icons/mail_icon.svg";
import YouTubeIcon from "assets/icons/youtube_icon.svg";
import HackAtUCIIcon from "assets/logos/hack-at-uci-logo.svg";
import Image from "next/image";
import styles from "./Footer.module.scss";

const SOCIALS = [
	{
		link: "https://hack.ics.uci.edu",
		icon: HackAtUCIIcon,
		alt: "Hack at UCI website",
	},
	{
		link: "mailto:hack@uci.edu",
		icon: MailIcon,
		alt: "Mail",
	},
	{
		link: "https://www.facebook.com/UCI.Hack/",
		icon: FacebookIcon,
		alt: "Facebook",
	},
	{
		link: "https://www.instagram.com/hackatuci/",
		icon: InstagramIcon,
		alt: "Instagram",
	},
	{
		link: "https://www.linkedin.com/company/hackuci",
		icon: LinkedInIcon,
		alt: "LinkedIn",
	},
	{
		link: "https://www.youtube.com/channel/UCeQbk4CMo3mxPHMtY80PtFQ",
		icon: YouTubeIcon,
		alt: "YouTube",
	},
];

function Footer() {
	return (
		<footer className={styles["footer"]}>
			<div className={styles["footer-socials"]}>
				{SOCIALS.map(({ link, icon, alt }) => (
					<a key={link} href={link} target="_blank" rel="noreferrer">
						<Image src={icon} alt={alt} />
					</a>
				))}
			</div>
			<p>
				Made with 💖 in Irvine, CA • Learn more about the{" "}
				<a href="https://hack.ics.uci.edu/about">Hack @ UCI team</a>
			</p>
		</footer>
	);
}

export default Footer;
