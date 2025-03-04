"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Linkedin,
  Instagram,
  Twitter,
  Users,
  Code,
  Target,
  Globe,
} from "lucide-react";
import Image from "next/image";

const TentangKamiPage = () => {
  const team = [
    {
      name: "Wildan Mukmin",
      role: "Founder and Developer",
      image: "/img-profile/wildan.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/wildan-mukmin-7569422a7/",
        instagram: "https://www.instagram.com/wildan_mukmin/",
        twitter: "https://x.com/bng_wil",
      },
    },
    {
      name: "Febrina Aulia Azahra",
      role: "Sistem Analyst",
      image: "/img-profile/peb.jpeg",
      socials: {
        linkedin: "#",
        instagram: "#",
        twitter: "#",
      },
    },
    {
      name: "Bungaran Natanael",
      role: "Designer",
      image:
        "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      socials: {
        linkedin: "#",
        instagram: "#",
        twitter: "#",
      },
    },
    {
      name: "Napis Rizqullah",
      role: "QA Tester",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      socials: {
        linkedin: "#",
        instagram: "#",
        twitter: "#",
      },
    },
  ];

  const technologies = [
    { name: "Next.js", description: "React framework for production" },
    { name: "React", description: "UI component library" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "shadcn UI", description: "Re-usable UI components" },
    { name: "Node.js", description: "JavaScript runtime" },
    { name: "PostgreeSQL", description: "SQL database" },
  ];

  const awards = [
    {
      year: 2020,
      items: [
        {
          name: "Fast Company's best Workplaces for innovators",
          description: "Workday - best Workplaces for innovators",
          logo: "/awards/fast-company.png",
        },
        {
          name: "Communicator Awards",
          description: "Mobile - Features Best Visual Design - Aesthetic",
          logo: "/awards/communicator.png",
        },
        {
          name: "Inc's best workspaces",
          description: "2020 Honoree - Inc's best workspaces",
          logo: "/awards/inc.png",
        },
        {
          name: "CES Innovation Award",
          description: "Shadecraft - best CES Innovation Award in IoT",
          logo: "/awards/ces.png",
        },
      ],
    },
    {
      year: 2019,
      items: [
        // Add 2019 awards if needed
      ],
    },
  ];

  return (
    <main className="container mx-auto py-12 px-4 md:px-6 cursor-default">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Tentang Travesia
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Platform komunitas petualangan yang menghubungkan para traveler,
            pecinta alam di seluruh indonesia.
          </p>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Tentang Kami</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg">
              Travesia adalah platform komunitas petualangan yang dirancang
              untuk menghubungkan para pecinta alam, dan traveler di seluruh
              indonesia. Kami menyediakan forum diskusi, informasi destinasi,
              sistem reservasi aktivitas outdoor, serta blog rekomendasi
              perlengkapan petualangan, forum sebagai media informasi, dan masih
              banyak lainnya. Dengan Travesia, petualanganmu jadi lebih
              terencana, seru, dan aman!
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Visi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Menjadi platform komunitas petualangan terdepan yang
                    menghubungkan para traveler, mendukung eksplorasi wisata
                    alam, dan memperkenalkan destinasi tersembunyi yang menarik.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Misi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Membantu para petualang menemukan dan berbagi informasi
                      destinasi terbaik.
                    </li>
                    <li>
                      Menyediakan forum interaktif bagi komunitas traveler dan
                      pecinta outdoor.
                    </li>
                    <li>
                      Menghadirkan fitur reservasi aktivitas petualangan dengan
                      sistem yang aman.
                    </li>
                    <li>
                      Mendorong ekowisata lokal dan petualangan yang bertanggung
                      jawab terhadap lingkungan.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Anggota Kelompok
            </CardTitle>
            <CardDescription>
              Kami bangga dengan tim kami yang antusias terhadap solusi dan
              selalu mencari lebih banyak orang dengan hasrat & pengalaman
              serupa di dunia teknologi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center text-center space-y-3 p-4 border rounded-lg hover:-translate-y-2 transition"
                >
                  <div className="relative w-44 h-44">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        className="rounded-full object-cover"
                        fill
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
                        {member.name.substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technologies Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Teknologi yang Digunakan
            </CardTitle>
            <CardDescription>
              Tools dan teknologi yang kami gunakan untuk membangun Travesia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="border rounded-lg p-4 text-center hover:border-primary hover:-translate-y-2 transition opacity-70 hover:opacity-100"
                >
                  <h3 className="font-medium">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Partners Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Media Partner</CardTitle>
            <CardDescription>
              Travesia berkolaborasi dengan berbagai owner destinasi dan
              komunitas pecinta alam untuk membangun ekosistem petualangan yang
              lebih luas dan bermanfaat.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">
                Owner Destinasi Wisata
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Pemilik atau pengelola destinasi wisata alam, seperti camping
                  ground, tempat hiking, rafting, dan wisata outdoor lainnya.
                </li>
                <li>
                  Memungkinkan traveler untuk menemukan dan melakukan reservasi
                  aktivitas di destinasi mereka.
                </li>
                <li>
                  Menyediakan informasi eksklusif tentang pengalaman dan
                  fasilitas yang tersedia di lokasi mereka.
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-3">
                Komunitas Pecinta Alam
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Kelompok hiking, survival, panjat tebing, diving, dan
                  komunitas outdoor lainnya.
                </li>
                <li>
                  Berbagi pengalaman dan tips petualangan melalui blog dan forum
                  Travesia.
                </li>
                <li>
                  Mendukung kegiatan edukasi dan event outdoor untuk
                  meningkatkan kesadaran tentang petualangan yang bertanggung
                  jawab.
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="text-sm py-1">
                Unila
              </Badge>
              <Badge variant="outline" className="text-sm py-1">
                Taman Nasional Way Kambas
              </Badge>
              <Badge variant="outline" className="text-sm py-1">
                Mapala Indonesia
              </Badge>
              <Badge variant="outline" className="text-sm py-1">
                Komunitas Diving Lampung
              </Badge>
              <Badge variant="outline" className="text-sm py-1">
                Hiking Indonesia
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TentangKamiPage;
