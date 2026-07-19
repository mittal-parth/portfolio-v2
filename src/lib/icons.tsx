import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMail,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  SiDjango,
  SiFlask,
  SiGmail,
  SiGooglesheets,
  SiGooglecloud,
  SiGraphql,
  SiIpfs,
  SiJquery,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiRubyonrails,
  SiSolidity,
  SiSupabase,
  SiTailwindcss,
  SiThirdweb,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaHardHat, FaRust } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiGeminiFill, RiOpenaiFill } from "react-icons/ri";
import type { IconType } from "react-icons";

export const socialIconMap: Record<string, IconType> = {
  linkedin: AiFillLinkedin,
  github: AiFillGithub,
  mail: AiFillMail,
  twitter: AiOutlineTwitter,
};

export const stackIconMap: Record<string, IconType> = {
  Solidity: SiSolidity,
  Typescript: SiTypescript,
  TypeScript: SiTypescript,
  "React.js": SiReact,
  React: SiReact,
  "React Native": SiReact,
  TailwindCSS: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  Gemini: RiGeminiFill,
  Thirdweb: SiThirdweb,
  IPFS: SiIpfs,
  "Node.js": SiNodedotjs,
  Supabase: SiSupabase,
  "Vercel AI SDK": SiVercel,
  Python: SiPython,
  "Gmail API": SiGmail,
  "Google Sheets API": SiGooglesheets,
  "Twitter API": FaXTwitter,
  "Google Cloud Platform": SiGooglecloud,
  OpenAI: RiOpenaiFill,
  Flask: SiFlask,
  Rust: FaRust,
  "Ruby on Rails": SiRubyonrails,
  jQuery: SiJquery,
  "Web3.js": SiSolidity,
  HardHat: FaHardHat,
  Arduino: SiSolidity,
  "Push Protocol": IoIosNotificationsOutline,
  Django: SiDjango,
  GraphQL: SiGraphql,
  "Dot Net Core MVC 6": SiGraphql,
};

export function getStackIcon(name: string): IconType {
  return stackIconMap[name] ?? RiGeminiFill;
}

export { AiFillGithub, AiFillYoutube };
