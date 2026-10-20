"use client";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "../Buttons";
import { Card } from "../common/Card";
import { InputComponent } from "../InputFields/InputComponent";
import { TextAreaComponent } from "../InputFields/TextAreaComponent";
import {
	faAt,
	faLocationDot,
	faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
	faDiscord,
	faGithub,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { SocialCard } from "../others/SocialCard";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const ContactPage = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		jobType: "",
		stack: "",
		message: "",
		botcheck: "",
	});

	const [status, setStatus] = useState<
		"idle" | "sending" | "sent" | "error" | "captcha" | "missing"
	>("idle");

	const [captchaToken, setCaptchaToken] = useState("");
	const captchaRef = useRef<HCaptcha>(null);

	const onHCaptchaChange = (token: string) => {
		setCaptchaToken(token);
		setStatus((prev) => (prev === "sending" ? prev : "idle"));
	};

	const onHCaptchaExpire = () => {
		setCaptchaToken("");
	};

	const updateField =
		(field: keyof typeof form) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
			setStatus((prev) =>
				prev === "error" || prev === "sent" ? "idle" : prev,
			);
		};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (status === "sending") return;

		const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
		if (!accessKey) {
			console.error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set");
			setStatus("error");
			return;
		}

		setStatus("sending");

		if (!form.name || !form.email || !form.message) {
			setStatus("missing");
			return;
		}

		if (!captchaToken) {
			setStatus("captcha");
			return;
		}

		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					...form,
					access_key: accessKey,
					"h-captcha-response": captchaToken,
				}),
			});

			const data = (await res.json().catch(() => null)) as {
				message?: string;
			} | null;
			if (!res.ok) {
				throw new Error(data?.message ?? `Web3Forms returned ${res.status}`);
			}

			setStatus("sent");
			setForm({
				name: "",
				email: "",
				jobType: "",
				stack: "",
				message: "",
				botcheck: "",
			});
			setCaptchaToken("");
			captchaRef.current?.resetCaptcha();
		} catch (error) {
			console.error("Contact form submission failed:", error);
			setStatus("error");
		}
	};

	return (
		<>
			<div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
				{/* Contact Info (Left side) */}
				<Card className="bg-transparent border-none w-full lg:w-5/12 space-y-6 lg:space-y-4">
					<div className="flex items-center gap-2">
						<div className="bg-red-700 w-8 h-0.5 rounded-xl" />
						<h1 className="font-bold text-sm">Direct Comm Channel</h1>
					</div>
					<div>
						<h1 className="text-3xl lg:text-4xl font-bold">Get in Touch</h1>
						<p className="text-neutral-400 text-sm lg:text-base">
							Interested in hiring me as a junior developer or collaborating on
							a project? Feel free to reach out to me via the contact form or
							through my social media channels.
						</p>
					</div>
					<Card className="flex items-center gap-2">
						<FontAwesomeIcon icon={faAt} className="text-red-300 shrink-0" />
						<div className="min-w-0">
							<p className="text-xs lg:text-sm text-neutral-400">
								Primary Email Address
							</p>
							<h5 className="text-base lg:text-lg wrap-break-words">
								darkiex03@gmail.com
							</h5>
						</div>
					</Card>
					<Card className="flex items-center gap-2">
						<FontAwesomeIcon
							icon={faLocationDot}
							size="lg"
							className="text-blue-300 mr-1 shrink-0"
						/>
						<div className="min-w-0">
							<p className="text-xs lg:text-sm text-neutral-400">
								Location & Zone
							</p>
							<h5 className="text-base lg:text-lg wrap-break-words">
								Budapest, Hungary ● UTC+1
							</h5>
						</div>
					</Card>
					<Card className="bg-transparent border-none space-y-4 w-full">
						<h1 className="text-sm text-neutral-400">Social Media</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-70">
							<SocialCard
								href={"https://github.com/Geher-Marcell"}
								icon={faGithub}
								title={"Github"}
								description={"Geher-Marcell"}
							/>
							<SocialCard
								href={"https://www.linkedin.com/in/marcell-geh%C3%A9r/"}
								icon={faLinkedin}
								title={"LinkedIn"}
								description={"Marcell Gehér"}
							/>
							<SocialCard
								href={"https://www.instagram.com/"}
								icon={faInstagram}
								title={"Instagram"}
								description={"TBA"}
							/>
							<SocialCard
								href={"https://discord.com/"}
								icon={faDiscord}
								title={"Discord"}
								description={"dark0ng"}
							/>
						</div>
					</Card>
				</Card>

				{/* Contact Form (Right side) */}
				<Card className="w-full lg:w-7/12 space-y-6 p-4 sm:p-8 h-fit">
					<div>
						<div className="flex items-baseline gap-2">
							<h1 className="text-2xl font-semibold">Send a Message</h1>
							{status === "sent" && (
								<p className="text-sm text-green-400" role="status">
									Thanks for reaching out — I&apos;ll get back to you as soon as
									possible.
								</p>
							)}
							{status === "missing" && (
								<p className="text-sm text-yellow-400" role="status">
									Please fill in all required fields before sending your
									message.
								</p>
							)}
							{status === "error" && (
								<p className="text-sm text-red-400" role="status">
									Something went wrong — please try again or email me directly
									at darkiex03@gmail.com.
								</p>
							)}
							{status === "captcha" && (
								<p className="text-sm text-yellow-400" role="status">
									Please complete the captcha before sending your message.
								</p>
							)}
						</div>
						<p className="text-neutral-400 text-sm">
							Fill out the form below to send a message. I will get back to you
							as soon as possible.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
							<InputComponent
								label={"Name"}
								value={form.name}
								placeholder={"Enter your name"}
								autoComplete="name"
								onChange={updateField("name")}
								inputClassName={
									status === "missing" && !form.name
										? "border-red-700 focus:border-red-400"
										: ""
								}
								labelClassName={
									status === "missing" && !form.name ? "text-red-500" : ""
								}
							/>
							<InputComponent
								label={"Email"}
								type="email"
								value={form.email}
								placeholder={"Enter your email"}
								autoComplete="email"
								onChange={updateField("email")}
								inputClassName={
									status === "missing" && !form.email
										? "border-red-700 focus:border-red-400"
										: ""
								}
								labelClassName={
									status === "missing" && !form.email ? "text-red-500" : ""
								}
							/>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
							<InputComponent
								label={"Job Type"}
								value={form.jobType}
								placeholder={"e.g. Job-related, Freelance, Internship"}
								onChange={updateField("jobType")}
							/>
							<InputComponent
								label={"Relevant Stack"}
								value={form.stack}
								placeholder={"e.g. React, Next.js, Laravel"}
								onChange={updateField("stack")}
							/>
						</div>

						<TextAreaComponent
							label={"Message"}
							placeholder="A brief description of project requirements, timeline or context..."
							maxLength={500}
							rows={4}
							value={form.message}
							onChange={updateField("message")}
							textAreaClassName={
								status === "missing" && !form.message
									? "border-red-700 focus:border-red-400"
									: ""
							}
							labelClassName={
								status === "missing" && !form.message ? "text-red-500" : ""
							}
						/>

						<div className="flex justify-center scale-80 md:scale-100">
							<HCaptcha
								ref={captchaRef}
								sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
								reCaptchaCompat={false}
								onVerify={onHCaptchaChange}
								onExpire={onHCaptchaExpire}
								theme={"dark"}
							/>
						</div>

						<PrimaryButton
							type="submit"
							disabled={status === "sending"}
							className="w-full gap-2 p-4">
							{status === "sending" ? (
								"Sending..."
							) : (
								<>
									<FontAwesomeIcon icon={faPaperPlane} />
									{status === "sent" ? "Message sent ✓" : "Send Message"}
								</>
							)}
						</PrimaryButton>
					</form>
				</Card>
			</div>
		</>
	);
};
