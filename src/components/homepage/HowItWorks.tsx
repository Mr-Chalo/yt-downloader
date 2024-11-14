import { HowItWorks } from "@/data/howItWorks";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function HowItWorksSection() {
  return (
    <>
      <div className=" space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary mt-10">
          How it works
        </h1>
        <div className="flex flex-auto gap-6 flex-wrap items-center justify-center">
          {HowItWorks.map((item, index) => (
            <Card
              key={index}
              className="p-4 w-[250px] h-[280px] flex flex-col items-center"
            >
              <CardHeader>
                <item.icon className="w-14 h-14 text-primary mx-auto" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center">{item.title}</CardTitle>
              </CardContent>
              <CardFooter className="text-center w-full">
                <CardDescription className="text-center w-full ">
                  {item.description}
                </CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
