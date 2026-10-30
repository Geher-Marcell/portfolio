import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/app/seo";

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;
const webpageId = `${SITE_URL}/#webpage`;

const schema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": personId,
			name: SITE_NAME,
			alternateName: "Marcell Gehér",
			url: SITE_URL,
			image: `${SITE_URL}/opengraph-image`,
			jobTitle: "Full Stack Web Developer",
			description: SITE_DESCRIPTION,
			email: "mailto:darkiex03@gmail.com",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Budapest",
				addressCountry: "HU",
			},
			knowsAbout: [
				"Next.js",
				"React",
				"TypeScript",
				"JavaScript",
				"Tailwind CSS",
				"C#",
				".NET",
				"Unity",
				"PHP",
				"Laravel",
				"Java",
				"MySQL",
				"Full stack web development",
			],
			knowsLanguage: [
				{ "@type": "Language", name: "Hungarian" },
				{ "@type": "Language", name: "English" },
			],
			alumniOf: [
				{
					"@type": "CollegeOrUniversity",
					name: "Óbudai Egyetem",
					url: "https://uni-obuda.hu/",
				},
				{
					"@type": "EducationalOrganization",
					name: "Jedlik Ányos Technikum",
				},
			],
			sameAs: [
				"https://github.com/Geher-Marcell",
				"https://www.linkedin.com/in/marcell-geh%C3%A9r/",
			],
		},
		{
			"@type": "WebSite",
			"@id": websiteId,
			url: SITE_URL,
			name: SITE_NAME,
			description: SITE_DESCRIPTION,
			inLanguage: "en",
			publisher: { "@id": personId },
		},
		{
			"@type": "ProfilePage",
			"@id": webpageId,
			url: SITE_URL,
			name: SITE_TITLE,
			description: SITE_DESCRIPTION,
			isPartOf: { "@id": websiteId },
			about: { "@id": personId },
			mainEntity: { "@id": personId },
			inLanguage: "en",
		},
	],
};

export const PersonJsonLd = () => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(schema).replace(/</g, "\\u003c"),
			}}
		/>
	);
};
