import {
  ArrowUpRight,
  Brain,
  Code2,
  Database,
  Download,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Rocket,
  Send,
  Smartphone,
  Sun,
  X,
} from "lucide-react";

export const icons = {
  ArrowUpRight,
  Brain,
  Code2,
  Database,
  Download,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Rocket,
  Send,
  Smartphone,
  Sun,
  X,
};

export function Icon({ name, size = 20, ...props }) {
  const Component = icons[name] || Code2;
  return <Component size={size} strokeWidth={1.9} aria-hidden="true" {...props} />;
}
