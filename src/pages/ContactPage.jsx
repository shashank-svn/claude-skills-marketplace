import React, { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useToast } from "../components/Toast";

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill in all required fields.", "error");
      return;
    }
    setSubmitted(true);
    addToast(
      "Message sent successfully! We will get back to you soon.",
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Contact{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Our Team
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm md:col-span-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Email Us
                    </h3>
                    <p className="text-sm text-gray-500">
                      support@claudeskills.market
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Call Us
                    </h3>
                    <p className="text-sm text-gray-500">+1 (800) 555-0199</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Location
                    </h3>
                    <p className="text-sm text-gray-500">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Our support team is active Monday to Friday from 9 AM to 6 PM
                PST.
              </p>
            </div>
          </div>

          {/* Form Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm md:col-span-2">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h2>
                <p className="text-gray-500 mb-6 max-w-sm">
                  Thank you for reaching out. We have received your message and
                  will review it promptly.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                    setSubmitted(false);
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-all"
                    placeholder="Describe your query in detail..."
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
