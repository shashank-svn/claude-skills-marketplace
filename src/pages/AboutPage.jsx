import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { HelpCircle, Shield, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Claude Skills Marketplace
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The premier platform for buying and selling reusable AI
            capabilities, system prompts, and custom tools.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Welcome to the <strong>Claude Skills Marketplace</strong>. We
            believe the future of AI lies in modular, composable capabilities.
            Instead of building every integration from scratch, developers and
            AI enthusiasts should be able to plug in specialized "skills"
            directly into their AI agents.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            From API integration templates and custom tool definitions to
            structured prompt recipes and data pipelines, our platform empowers
            creators to monetize their expertise and helps buyers supercharge
            their LLM setups.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verified Content
                </h3>
                <p className="text-sm text-gray-500">
                  Every skill goes through safety and quality reviews to ensure
                  it works seamlessly and safely.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Creator Economy
                </h3>
                <p className="text-sm text-gray-500">
                  We offer developers a platform to publish their specialized AI
                  skills and earn royalties.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Premium Quality
                </h3>
                <p className="text-sm text-gray-500">
                  Browse top-tier capability packages, custom tools, and prompt
                  architectures.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Detailed Support
                </h3>
                <p className="text-sm text-gray-500">
                  Access integration docs, schema definitions, and
                  implementation guides for every skill.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-2xl p-8 border border-orange-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ready to explore?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Start browsing our catalog or register as a seller today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/skills">
              <Button variant="primary">Browse Skills</Button>
            </Link>
            {/* <Link to="/dashboard">
              <Button variant="secondary">Become a Seller</Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
