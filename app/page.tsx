import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>next app</h1>
      <p>Hello World</p>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
