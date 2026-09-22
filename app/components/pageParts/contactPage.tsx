import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "../Buttons";
import { Card } from "../common/Card";
import { InputComponent } from "../InputFields/InputComponent";
import { TextAreaComponent } from "../InputFields/TextAreaComponent";
import {
	faAt,
	faLocation,
	faLocationDot,
	faMap,
	faMarker,
	faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
	faDiscord,
	faGithub,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export const ContactPage = () => {
	return (
		<>
			<div className="flex flex-row gap-8">
				{/* Contact Info (Left side) */}
				<Card className="bg-transparent border-none w-5/12 space-y-4">
					<div className="flex items-center gap-2">
						<div className="bg-red-700 w-8 h-0.5 rounded-xl" />
						<h1 className="font-bold text-sm">
							Direct Comm Channel
						</h1>
					</div>
					<div>
						<h1 className="text-4xl font-bold">Get in Touch</h1>
						<p className="text-neutral-400">
							Interested in hiring me as a junior developer or
							collaborating on a project? Feel free to reach out
							to me via the contact form or through my social
							media channels.
						</p>
					</div>
					<Card className="flex items-center gap-2">
						<FontAwesomeIcon
							icon={faAt}
							size="lg"
							className="text-red-300 mr-1"
						/>
						<div>
							<p className="text-sm text-neutral-400">
								Primary Email Address
							</p>
							<h5 className="text-lg">darkiex03@gmail.com</h5>
						</div>
					</Card>
					<Card className="flex items-center gap-2">
						<FontAwesomeIcon
							icon={faLocationDot}
							size="lg"
							className="text-blue-300 mr-1"
						/>
						<div>
							<p className="text-sm text-neutral-400">
								Location & Zone
							</p>
							<h5 className="text-lg">
								Budapest, Hungary ● UTC+1
							</h5>
						</div>
					</Card>
					<Card className="bg-transparent border-none w-5/12 space-y-4 w-full">
						<h1 className="text-sm text-neutral-400">
							Social Media
						</h1>
						<div className="grid grid-cols-2 gap-4 opacity-70">
							<Card className="flex items-center gap-2 text-lg">
								<FontAwesomeIcon icon={faGithub} size="lg" />{" "}
								<div>
									<p className="text-sm text-neutral-400">
										Github
									</p>
									<h5 className="text-lg">Geher-Marcell</h5>
								</div>
							</Card>
							<Card className="flex items-center gap-2 text-lg">
								<FontAwesomeIcon icon={faLinkedin} size="lg" />{" "}
								<div>
									<p className="text-sm text-neutral-400">
										LinkedIn
									</p>
									<h5 className="text-lg">Marcell Gehér</h5>
								</div>
							</Card>
							<Card className="flex items-center gap-2 text-lg">
								<FontAwesomeIcon icon={faInstagram} size="lg" />{" "}
								<div>
									<p className="text-sm text-neutral-400">
										Instagram
									</p>
									<h5 className="text-lg">TBA</h5>
								</div>
							</Card>
							<Card className="flex items-center gap-2 text-lg">
								<FontAwesomeIcon icon={faDiscord} size="lg" />{" "}
								<div>
									<p className="text-sm text-neutral-400">
										Discord
									</p>
									<h5 className="text-lg">dark0ng</h5>
								</div>
							</Card>
						</div>
					</Card>
				</Card>

				{/* Contact Form (Right side) */}
				<Card className="w-7/12 space-y-6 p-8">
					<div>
						<h1 className="text-2xl font-semibold">
							Send a Message
						</h1>
						<p className="text-neutral-400 text-sm">
							Fill out the form below to send a message. I will
							get back to you as soon as possible.
						</p>
					</div>

					<div className="flex items-center justify-evenly *:w-full gap-10">
						<InputComponent
							label={"Name"}
							value={""}
							placeholder={"Enter your name"}
							onChange={function (
								e: React.ChangeEvent<HTMLInputElement>,
							): void {
								throw new Error("Function not implemented.");
							}}
						/>
						<InputComponent
							label={"Email"}
							value={""}
							placeholder={"Enter your email"}
							onChange={function (
								e: React.ChangeEvent<HTMLInputElement>,
							): void {
								throw new Error("Function not implemented.");
							}}
						/>
					</div>

					<div className="flex items-center justify-evenly *:w-full gap-10">
						<InputComponent
							label={"Job Type"}
							value={""}
							placeholder={
								"e.g. Job-related, Freelance, Internship"
							}
							onChange={function (
								e: React.ChangeEvent<HTMLInputElement>,
							): void {
								throw new Error("Function not implemented.");
							}}
						/>

						<InputComponent
							label={"Relevant Stack"}
							value={""}
							placeholder={"e.g. React, Next.js, Laravel"}
							maxLength={50}
							onChange={function (
								e: React.ChangeEvent<HTMLInputElement>,
							): void {
								throw new Error("Function not implemented.");
							}}
						/>
					</div>

					<TextAreaComponent
						label={"Message"}
						placeholder="A brief description of project requirements, timeline or context..."
						maxLength={500}
						value={""}
						onChange={function (
							e: React.ChangeEvent<HTMLTextAreaElement>,
						): void {
							throw new Error("Function not implemented.");
						}}
					/>

					<PrimaryButton className="w-full gap-2 p-4">
						{" "}
						<FontAwesomeIcon icon={faPaperPlane} /> Send
						Message{" "}
					</PrimaryButton>
				</Card>
			</div>
		</>
	);
};
