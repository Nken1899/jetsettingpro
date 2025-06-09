import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";

export default function JetSettingProHome() {
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    axios.get("/api/products?keyword=travel+gear").then((res) => {
      setProducts(res.data.items || []);
    });
  }, []);

  const handleSubscribe = async () => {
    try {
      await axios.post("https://api.convertkit.com/v3/forms/8161423/subscribe", {
        api_key: "Dpjzr5PjVE2TBHeIbQuIKQ",
        email,
      });
      setSubscribed(true);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">JetSettingPro.com</h1>
        <p className="text-lg mt-2">Your guide to smarter, lighter, and better travel</p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Gear Guides</h2>
            <p>Discover the best travel gear for every type of journey — from backpacks to portable tech.</p>
            <Button className="mt-4 w-full">Explore Gear</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Travel Tips</h2>
            <p>Expert advice on packing, planning, and saving money while exploring the world.</p>
            <Button className="mt-4 w-full">Read Tips</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Destination Highlights</h2>
            <p>In-depth guides to must-see places, hidden gems, and culturally rich experiences.</p>
            <Button className="mt-4 w-full">See Destinations</Button>
          </CardContent>
        </Card>
      </section>

      <section className="text-center mt-12">
        <h3 className="text-2xl font-medium">Join the JetSettingPro Club</h3>
        <p className="mb-4">Get weekly travel hacks, gear reviews, and exclusive tips straight to your inbox.</p>
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSubscribe} disabled={subscribed}>
            {subscribed ? "Subscribed!" : "Subscribe"}
          </Button>
        </div>
      </section>

      <section className="mt-16">
        <h3 className="text-2xl font-medium text-center mb-6">Recommended Travel Products</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <img src={product.image} alt={product.title} className="mb-2 w-full h-48 object-cover" />
                <h4 className="text-lg font-semibold mb-2">{product.title}</h4>
                <p>{product.price}</p>
                <Button className="mt-4 w-full" asChild>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    View on Amazon
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}