import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src}></AvatarImage>
    </Avatar>
  );
};

export default BotAvatar;
