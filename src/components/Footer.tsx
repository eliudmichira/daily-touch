import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform}`,
      description: `Following us on ${platform}`,
      duration: 2000,
    });
  };

  const handleLinkClick = (path: string, linkName: string) => {
    toast({
      title: linkName,
      description: `Navigating to ${linkName}`,
      duration: 2000,
    });
    navigate(path);
  };

  const handleContactClick = (method: string, value: string) => {
    toast({
      title: `Contact via ${method}`,
      description: value,
      duration: 2000,
    });
  };

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-stone-600 dark:text-stone-400">
                <Phone className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-stone-600 dark:text-stone-400">
                <Mail className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
                <a href="mailto:info@dailytouch.com" className="hover:text-amber-600 dark:hover:text-amber-400">
                  info@dailytouch.com
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Location</h3>
            <div className="space-y-3">
              <div className="flex items-start text-stone-600 dark:text-stone-400">
                <MapPin className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                <address className="not-italic">
                  123 Design Street<br />
                  Creative District<br />
                  San Francisco, CA 94107
                </address>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-stone-500 dark:text-stone-500">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-white rounded-r-md hover:bg-amber-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
          <p className="text-center text-sm text-stone-500 dark:text-stone-500">
            © {new Date().getFullYear()} Daily Touch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
