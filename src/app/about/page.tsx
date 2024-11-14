"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import toast from "react-hot-toast";

// Content data
const contentData = [
  {
    title: "Our Product",
    paragraphs: [
      "YouTube Video Downloader is a powerful and user-friendly tool that allows you to search, download, and enjoy your favorite YouTube videos offline. Our application is designed with simplicity and efficiency in mind, providing a seamless experience for users who want to access YouTube content without an internet connection.",
    ],
    techStack: [
      "Next.js 15 with App Router",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Shadcn UI",
      "YouTube Data API",
      "Node.js",
    ],
  },
  {
    title: "About the Developer",
    paragraphs: [
      "I am a passionate full-stack developer with expertise in modern web technologies. With a keen eye for user experience and a deep understanding of both frontend and backend development, I strive to create efficient, scalable, and user-friendly applications.",
    ],
    developer: {
      name: "Nabin Khair",
      role: "Full Stack Developer",
      avatar: "/dev_avatar.png",
      socialLinks: [
        {
          href: "https://github.com/nabinkhair",
          icon: Github,
          ariaLabel: "GitHub",
          toastActionContent: "Follow me on GitHub",
        },
        {
          icon: Linkedin,
          ariaLabel: "LinkedIn",
          toastActionContent: "Currently LinkedIn account is not available",
        },
        {
          icon: Twitter,
          ariaLabel: "Twitter",
          toastActionContent: "Currently Twitter account is not available",
        },
      ],
    },
  },
];

// AboutPage Component
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About YouTube Video Downloader
      </motion.h1>

      {contentData.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Card className="shadow-lg p-8">
            <CardHeader className="mb-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            </CardHeader>
            <CardContent>
              {section.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}
              {section.techStack && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {section.techStack.map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                </>
              )}
              {section.developer && (
                <div className="mt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={section.developer.avatar}
                        alt={section.developer.name}
                      />
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-medium">
                        {section.developer.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {section.developer.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    {section.developer.socialLinks.map((link, idx) => (
                      link.href ? (
                        <Link
                          href={link.href}
                          key={idx}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                          aria-label={link.ariaLabel}
                          onClick={() => toast.success(link.toastActionContent)}
                        >
                          <link.icon className="w-6 h-6" />
                        </Link>
                      ) : (
                        <button
                          key={idx}
                          onClick={() => toast.error(link.toastActionContent)}
                          className="text-muted-foreground hover:text-primary"
                          aria-label={link.ariaLabel}
                        >
                          <link.icon className="w-6 h-6" />
                        </button>
                      )
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
