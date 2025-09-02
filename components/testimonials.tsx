"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export function Testimonials() {
  return (
    <div className="w-full max-w-7xl mx-auto my-20 py-20 px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Title Section - 40% */}
        <div className="w-full lg:w-[40%]">
          <div className="sticky top-20">
            <h2
              className={cn(
                "text-3xl text-center lg:text-left md:text-6xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] ",
                "bg-clip-text text-transparent leading-tight"
              )}
            >
              Quem será <br />
              o seu mentor? 
              <br />
              <br /> Ramiro Amorim
            </h2>
            <p className="text-sm text-center lg:text-left mx-auto lg:mx-0 text-neutral-400 mt-6 max-w-sm">
              Seu Mentor se chama Ramiro Amorim ja faturou mais de 6 Milhões em 3 meses
              com a internet e hoje ensina voce a criar uma marca dentro do digital e não apenas
              um produto qualquer sem ter um branding ou algo de valor por traz, Depois de alguns anos usando 
              a mesma estrategia que todos diziam percebeu que o mercado chegou em um platô.
              Aonde as pessoas meio que cansaram de comprar produtos sem agregar real valor na vida delas
              depois de 2 anos de mercado estudou mais possibilidades de como alcancar o publico e ter recorrência
              então de tornou programador Frontend tambem assim melhorando não só as suas ofertas mas tambem o modelo de mostragem
              e potencializando a escala e resultados 
            </p>
          </div>
        </div>

        {/* Right Testimonials Section - 60% */}
        <div className="w-full grid gap-8 grid-cols-1 lg:grid-cols-2 md:w-[60%] mx-auto">
          <TestimonialCard
            name="Diego Rocha"
            role="Rio de janeiro"
            image="/manu_arora.jpg"
            quote="Na call ele te passa um modelo de ação personalizado para o seu perfil e experinecia,e ai pega na sua mão até a escala"
          />
          <TestimonialCard
            name="Arthur Oliveita"
            role="Belo Horizonte"
            image="/kishore_gunnam.jpg"
            quote="2 meses de mentoria eu ja estou lucrando 4k por mês o que é 2x mais o que ganhava antes no meu emprego"
            className="lg:mt-[50px]"
          />
          <TestimonialCard
            name="Rosane Souza"
            role="Bahia"
            image="/kishore_gunnam.jpg"
            quote="Eu ja estava no mercado a 4 meses mas o pessoal so ensinava a vender mentiras e mecanismos ultrapassados! Hoje realmente tenho um negócio digital e nem tenho vergonha de falar o que vendo abertamente "
            className="lg:mt-[-50px]"
          />
          <TestimonialCard
            name="Juan Senna"
            role="São Paulo"
            image="/manu_arora.jpg"
            quote="O Ramiro me ajudou a meu infoproduto em cima da minha marca pessoal, sou personal trainer e hoje vendo não só para o brasil mas tambem pra Portugal e brasileiros fora do pais"
          />
        </div>
      </div>
    </div>
  );
}

const TestimonialCard = ({
  name,
  role,
  image,
  quote,
  className,
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "flex flex-col h-96 p-8 rounded-[17px]",
        "border border-[#474747]",
        "bg-white bg-[linear-gradient(178deg,#2E2E2E_0.37%,#0B0B0B_38.61%),linear-gradient(180deg,#4C4C4C_0%,#151515_100%),linear-gradient(180deg,#2E2E2E_0%,#0B0B0B_100%)]",
        "relative isolate",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neutral-700">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-neutral-400">{role}</p>
        </div>
      </div>
      <p className="text-lg text-neutral-300 leading-relaxed">
        &quot;{quote}&quot;
      </p>
    </motion.div>
  );
};
