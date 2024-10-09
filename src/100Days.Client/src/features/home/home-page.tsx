import { Button } from "../ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex mb-32 items-center justify-self-center flex-col gap-4">
        <h1 className="text-7xl yellowtail-regular">Welcome to 100 Days</h1>
        <div className="">
          <p className="text-2xl">
            We're glad you're here. We're here to help you change your habbits
            and acheive your goals 🎉
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex-1 flex flex-col gap-1 px-4">
          <h2 className="text-4xl font-bold italic mb-4">Don't Stress</h2>
          <div className="leading-7">
            <p>
              Learning new things, becoming healthier, stronger, requires{" "}
              <strong>change.</strong>{" "}
            </p>
            <p>
              It can require a lot of effort, and it can be stressful, but it
              doesn't have to be.{" "}
            </p>
            <p>
              With a simple idea of 100 days of consistent small changes we can
              learn new things, become healthier, stronger, and happier.
            </p>
            <div className="mt-8 flex justify-end gap-2">
              <Button size={"lg"}>Get Started</Button>
              <Button size={"lg"} variant={"secondary"}>
                About Us
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4">
          <img
            className="rounded-lg"
            src={"/woman-stressed.jpg"}
            alt="Woman stressed"
          />
        </div>
      </div>
    </div>
  );
}
