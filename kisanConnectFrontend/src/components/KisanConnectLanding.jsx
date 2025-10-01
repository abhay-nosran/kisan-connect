import React from "react";
import { CheckCircle, ShieldCheck, TrendingUp, Truck, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Pre‑harvest Quality Inspections",
    desc: "Independent on‑field assessments certify crop quality before listing, boosting buyer confidence."
  },
  {
    icon: CheckCircle,
    title: "Minimum Price Guarantee",
    desc: "Smart contracts lock‑in a fair base price, shielding farmers from market volatility."
  },
  {
    icon: ShoppingCart,
    title: "Bulk Purchase Thresholds",
    desc: "Buyers commit to volume slabs that cut handling costs and secure better margins."
  },
  {
    icon: TrendingUp,
    title: "Transparent Pre‑harvest Bidding",
    desc: "Real‑time auction engine drives competitive pricing and reveals true demand."
  },
  {
    icon: Truck,
    title: "Buyer‑Handled Logistics",
    desc: "Winning bidders arrange immediate pick‑up, preserving freshness and reducing farmer burden."
  }
];

const KisanConnectLanding = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-green-700 mb-6 drop-shadow-md"
        >
          Kisan -Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
        >
          Bridging farms to markets with transparent bidding, guaranteed prices, and hassle‑free logistics—so every harvest reaches buyers fresh and farmers earn what they deserve.
        </motion.p>
        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <a href="/login" className="px-10 py-3 rounded-2xl shadow-lg bg-green-700 hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-300 text-white font-semibold text-lg transition-transform hover:scale-105">Login</a>
          <a href="/signup" className="px-10 py-3 rounded-2xl shadow-lg bg-white text-green-700 border-2 border-green-700 hover:bg-green-100 focus-visible:ring-4 focus-visible:ring-green-300 font-semibold text-lg transition-transform hover:scale-105">Sign&nbsp;Up</a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">Key Features</h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Icon className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800">{title}</h3>
                <p className="text-gray-700 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-green-700 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your harvest journey?</h2>
        <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl">
          Join thousands of farmers and buyers transacting seamlessly on Kisan‑Connect.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="/signup" className="px-10 py-3 rounded-2xl shadow-lg bg-white text-green-700 hover:bg-green-100 font-semibold text-lg transition-transform hover:scale-105">Get&nbsp;Started</a>
          <a href="/login" className="px-10 py-3 rounded-2xl shadow-lg border-2 border-white hover:bg-green-600 font-semibold text-lg transition-transform hover:scale-105">Farmer&nbsp;/&nbsp;Buyer&nbsp;Login</a>
        </div>
      </section>

      {/* Copyright */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-white select-none">
        © {new Date().getFullYear()} Kisan-Connect. All rights reserved.
      </footer>
    </div>
  );
};

export default KisanConnectLanding;
