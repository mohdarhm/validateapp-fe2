"use client";
import { title, subtitle } from "@/components/primitives";
import { bold, code, fontSans, IP } from "@/config/fonts";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CircularProgress,
  Button,
} from "@nextui-org/react";
import { use, useEffect, useState } from "react";

export default function Home() {
  const [serverIp, setServerIp] = useState("");
  const [userIp, setUserIp] = useState("");
  const [serverIpLoading, setServerIpLoading] = useState(true);
  const [userIpLoading, setUserIpLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [success, isSuccess] = useState(false);
  const [failure, isFailure] = useState(false);
  const [message, setMessage] = useState("");
  const [btndis, setBtndis] = useState(true);

  const fetchUserIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setUserIp(data.ip);
    } catch (error) {
      console.error("Failed to fetch user IP:", error);
    } finally {
      setUserIpLoading(false);
    }
  };

  const fetchServerIp = async () => {
    try {
      const response = await fetch(
        "https://sound-bee-386508.el.r.appspot.com/getserverip/"
      );
      const data = await response.json();
      setServerIp(data.external_ip);
    } catch (error) {
      console.error("Failed to fetch server IP:", error);
    } finally {
      setServerIpLoading(false);
    }
  };

  const addIp = async () => {
    setButtonLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://sound-bee-386508.el.r.appspot.com/add_ip_to_firewall/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_ip: userIp }),
        }
      );

      const data = await response.json();
      setMessage(data.message || data.error || data.alreadyexists);
      const key = Object.keys(data)[0];
      if (key === "error") {
        isFailure(true);
      } else {
        isSuccess(true);
      }
    } catch (error) {
      console.error("Error adding to firewall:", error);
      isFailure(true);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    fetchServerIp();
    fetchUserIp();
  }, []);

  useEffect(() => {
    if (!serverIpLoading && !userIpLoading) {
      setBtndis(false);
    }
  }, [serverIpLoading, userIpLoading]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div
        className={clsx("inline-block max-w-5xl text-center justify-center")}
      >
        <h1
          className={clsx(
            "sm:text-7xl text-5xl font-black tracking-tighter text-yellow-400 pb-14",
            bold.className
          )}
        >
          {"idk what i am doing w my life"}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-10 max-w-full align-middle">
        <Card className="w-full md:w-auto px-7">
          <CardHeader className="flex gap-3 p-5">
            <div className="flex flex-col">
              <p className={clsx("sm:text-4xl text-2xl", code.className)}>
                {"SERVER IP"}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="p-10">
            {serverIpLoading ? (
              <CircularProgress className="scale-150 px-10" size="lg" />
            ) : (
              <p
                className={clsx(
                  "sm:font-black font-bold sm:text-6xl text-4xl",
                  IP.className
                )}
              >
                {serverIp}
              </p>
            )}
          </CardBody>
          <Divider />
        </Card>

        <h1
          className={clsx(
            "sm:text-8xl text-4xl px-10 md:px-0 font-black text-gray-400 align-middle",
            bold.className
          )}
        >
          {"&&"}
        </h1>

        <Card className="w-full md:w-auto px-7">
          <CardHeader className="flex gap-3 p-5">
            <div className="flex flex-col">
              <p className={clsx("sm:text-4xl text-2xl", code.className)}>
                {"YOUR IP"}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="p-10">
            {userIpLoading ? (
              <CircularProgress className="scale-150 px-10" size="lg" />
            ) : (
              <p
                className={clsx(
                  "sm:font-black font-bold sm:text-6xl text-4xl",
                  IP.className
                )}
              >
                {userIp}
              </p>
            )}
          </CardBody>
          <Divider />
        </Card>
      </div>

      <h1
        className={clsx(
          "sm:text-5xl text-5xl font-black tracking-tighter text-yellow-400 pt-10 pb-14",
          bold.className
        )}
      >
        {"Click the button below to achieve greatness."}
      </h1>

      <Button
        isDisabled={btndis}
        isLoading={buttonLoading}
        onClick={addIp}
        variant="ghost"
        color="success"
        className="scale-150 py-8 px-16"
        size="lg"
      >
        {"Click hereeeeeeeee"}
      </Button>

      {failure ? (
        <Card className="w-full md:w-auto max-w-[600px] px-7 mt-20 bg-blue-400">
          <CardHeader className="flex gap-3 p-5">
            <div className="flex flex-col">
              <p className={clsx("text-lg", code.className)}>
                {"Error Center D:"}
              </p>
            </div>
          </CardHeader>
          <CardBody className="p-10">
            <p className={clsx("sm:text-xl text-md", fontSans.className)}>
              {message}
            </p>
          </CardBody>
        </Card>
      ) : (
        <></>
      )}
      {success ? (
        <Card className="w-full md:w-auto max-w-[600px] px-7 mt-20 bg-emerald-400">
          <CardHeader className="flex gap-3 p-5">
            <div className="flex flex-col">
              <p className={clsx("text-lg", code.className)}>
                {"Success Center :D"}
              </p>
            </div>
          </CardHeader>
          <CardBody className="p-10">
            <p className={clsx("sm:text-xl text-md", fontSans.className)}>
              {message}
            </p>
          </CardBody>
        </Card>
      ) : (
        <></>
      )}
    </section>
  );
}
