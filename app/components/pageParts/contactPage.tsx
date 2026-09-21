import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "../Buttons";
import { Card } from "../common/Card";
import { InputComponent } from "../InputFields/InputComponent";
import { TextAreaComponent } from "../InputFields/TextAreaComponent";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const ContactPage = () => {
	return (
		<>
			<div className="flex flex-row bg-red-500/10">
				<Card className="bg-transparent border-none w-5/12">
					<div className="flex items-center gap-2">
						<div className="bg-red-700 w-8 h-0.5 rounded-xl" />
						<h1 className="font-bold text-sm">
							Direct Comm Channel
						</h1>
					</div>
					<Card>Cigány</Card>
				</Card>
				<Card className="w-7/12 space-y-6">
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
