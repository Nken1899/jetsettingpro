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
    <div className="px-6 py-12 space-y-16 font-sans bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">JetSettingPro</h1>
        <p className="text-xl text-gray-600">
          Your ultimate guide to luxury travel, curated gear, and elevated experiences.
        </p>
        <div className="mt-6 flex justify-center gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSubscribe} disabled={subscribed}>
            {subscribed ? "Subscribed!" : "Join Now"}
          </Button>
        </div>
        <p className="text-sm text-gray-500">Join our club for exclusive tips & gear guides.</p>
      </section>

      {/* Feature Highlights */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: "Luxury Travel Gear",
            desc: "Discover the finest carry-ons, tech, and essentials for elevated journeys.",
            cta: "Explore Gear",
          },
          {
            title: "Insider Travel Tips",
            desc: "Smart strategies for smooth, stylish, and affordable global adventures.",
            cta: "Read Tips",
          },
          {
            title: "Elite Destinations",
            desc: "From hidden gems to 5-star resorts, explore the world's most inspiring escapes.",
            cta: "See Places",
          },
        ].map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
              <Button className="mt-4 w-full">{item.cta}</Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-6">Recommended Travel Gear</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-3 rounded-lg" />
                <h4 className="text-lg font-semibold mb-1">{product.title}</h4>
                <p className="text-gray-600">{product.price}</p>
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

      {/* Footer (Coming Soon) */}
      <footer className="text-center text-sm text-gray-400 pt-12 border-t">
        <p>&copy; {new Date().getFullYear()} JetSettingPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
