"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  QrCode,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const KontakPage = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Hubungi Kami</h1>
      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Customer Service Card */}
        <Card className="col-span-full md:col-span-2">
          <CardContent className="p-0">
            <div className="p-4 border-b flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <MessageSquare size={16} className="text-primary" />
              </div>
              <h2 className="font-medium">Hubungi customer service kami</h2>
            </div>

            {/* Contact Accordions */}
            <Accordion type="multiple" className="w-full">
              {/* Phone Contact */}
              <AccordionItem value="phone">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-primary" />
                    <div>
                      <p className="font-medium text-left">
                        Telepon customer service kami
                      </p>
                      <p className="text-xs text-muted-foreground text-left">
                        Direkomendasikan untuk pengguna telepon normal.
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="ml-6">
                    <p className="mb-2 text-primary">
                      Informasikan no. pesanan Travesia mu saat menghubungi
                      kami.
                    </p>
                    <Button variant="outline" className="w-full md:w-auto">
                      Lihat nomor telepon call center kami
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Email Contact */}
              <AccordionItem value="email">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-primary" />
                    <p className="font-medium text-left">
                      Kirim email ke Customer Service
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="ml-6">
                    <p className="mb-4">
                      Mohon kirimkan email Anda ke Customer Service kami di{" "}
                      <span className="text-primary">cs@travesia.com</span>
                    </p>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-1"
                          >
                            Nama
                          </label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan nama Anda"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-1"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email Anda"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-1"
                        >
                          Subjek
                        </label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Masukkan subjek pesan"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-1"
                        >
                          Pesan
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tulis pesan Anda di sini..."
                          rows={5}
                          required
                        />
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button type="submit">Kirim</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Pesan Terkirim</AlertDialogTitle>
                            <AlertDialogDescription>
                              Terima kasih telah menghubungi kami !
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction asChild>
                              <Button>Tutup</Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </form>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Office Location Card */}
        <Card className="col-span-full md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kantor Customer Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">
                  Fakultas Matematika dan Ilmu Pengetahuan Alam (F-MIPA) - Unila
                </h3>
                <div className="flex items-start text-sm">
                  <MapPin className="w-8 h-8 mr-2 mt-1 text-muted-foreground" />
                  <p>
                    Jl. Prof. Dr. Ir. Sumantri Brojonegoro No.1, Gedong Meneng,
                    Kec. Rajabasa, Kota Bandar Lampung, Lampung 35141
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video overflow-hidden rounded-md border mt-2">
                <Image
                  src="/map-fmipa.jpeg"
                  width={500}
                  height={500}
                  alt="Peta fmipa unila"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Footer Info */}
              <div className="text-xs text-center text-muted-foreground pt-4 border-t mt-4">
                <p>
                  Direktorat Jenderal Perhubungan Konsumen dan Tertib Niaga,
                </p>
                <p>Kementerian Perdagangan Republik Indonesia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KontakPage;
