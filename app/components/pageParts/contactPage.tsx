import Image from "next/image";
import Link from "next/link";

export const ContactPage = () => {
	return (
		<>
			<div className="text-lg space-y-4 pb-20">
				<h1 className="text-4xl font-semibold">Get In Touch</h1>
				<div className="space-y-3 max-w-140">
					<div className="flex flex-col sm:flex-row gap-3">
						<div className="flex flex-col grow">
							<label
								htmlFor="name"
								className="ml-1 mb-0.5 text-md text-(--foreground-muted)"
							>
								Your Name
							</label>
							<input
								className="bg-(--background-muted) border border-neutral-600 p-2 rounded-lg"
								type="text"
								id="name"
								name="name"
								placeholder="Enter Your Name"
							/>
						</div>
						<div className="flex flex-col grow">
							<label
								htmlFor="email"
								className="ml-1 mb-0.5 text-md text-(--foreground-muted)"
							>
								Email Address
							</label>
							<input
								className="bg-(--background-muted) border border-neutral-600 p-2 rounded-lg"
								type="email"
								id="email"
								name="email"
								placeholder="Enter Your Email"
							/>
						</div>
					</div>
					<div className="flex flex-col col-span-2">
						<label
							htmlFor="message"
							className="ml-1 mb-0.5 text-md text-(--foreground-muted)"
						>
							Message
						</label>
						<textarea
							placeholder="Write something...."
							className="bg-(--background-muted) border border-neutral-600 p-2 rounded-lg"
							id="message"
							name="message"
							rows={5}
							maxLength={400}
							style={{ resize: "none" }}
						></textarea>
					</div>
					<div className="flex flex-col mt-6">
						<button className="bg-red-800 p-2 rounded-lg">Send Message</button>
					</div>
				</div>
			</div>
		</>
	);
};
