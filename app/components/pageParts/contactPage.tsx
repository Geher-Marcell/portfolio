import Image from "next/image";
import Link from "next/link";

export const ContactPage = () => {
	return (
		<>
			<h1 className="inline-block text-4xl font-semibold">Get In Touch</h1>
			<div className="bg-red-500 inline-block rotate-30 -translate-y-6 px-1 rounded-lg font-bold">
				WIP
			</div>
			<div className="w-full max-w-160 h-full flex flex-col md:flex-row gap-10 items-center py-10">
				<div className="w-full grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label htmlFor="name" className="ml-1 mb-1">
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
					<div className="flex flex-col">
						<label htmlFor="email" className="ml-1 mb-1">
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
					<div className="flex flex-col col-span-2">
						<label htmlFor="message" className="ml-1 mb-1">
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
					<div className="flex flex-col col-span-2">
						<button className="bg-red-800 p-2 rounded-lg">Send Message</button>
					</div>
				</div>
				{/* <div className="w-full space-y-2">
					<div>
						<p className="text-(--foreground-muted)">Email:</p>
						<p className="font-bold">example@gmail.com</p>
					</div>
					<div>
						<p className="text-(--foreground-muted)">Phone:</p>
						<p className="font-bold">+36 50 111 2222</p>
					</div>
					<div>
						<p className="text-(--foreground-muted)">Address:</p>
						<p className="font-bold text-(--foreground-muted)">
							No address as of now
						</p>
					</div>
					<div>
						<p className="text-(--foreground-muted)">Follow me</p>
						<div className="flex gap-2 mt-1.5">
							<Link
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block hover:scale-105 transition-transform active:scale-95"
							>
								<Image
									src="/instagram.svg"
									alt="Instagram"
									width={28}
									height={28}
								/>
							</Link>
							<Link
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block hover:scale-105 transition-transform active:scale-95"
							>
								<Image
									src="/discord.svg"
									alt="Discord"
									width={28}
									height={28}
								/>
							</Link>
						</div>
					</div>
				</div> */}
			</div>
		</>
	);
};
