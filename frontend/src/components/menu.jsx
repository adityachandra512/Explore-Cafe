import React from "react";
import Card from "./card";
import list from "../../public/list.json";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          <span className="text-yellow-500">Explorer Cafe Menu</span>
        </h1>
        <p className="mt-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          voluptatem nisi non commodi quasi in, omnis suscipit officia ullam
          minima quidem ipsa, iusto quaerat, accusantium iure culpa vel
          repellendus blanditiis. Quae dicta quod, velit beatae saepe ratione?
          Doloribus odio placeat saepe doloremque sit, quo, cumque soluta earum
          rerum ad modi dolorum tenetur aspernatur? Aspernatur soluta ipsum amet
          saepe esse eos! Officiis illum odit non totam reprehenderit repellat
          eius dolores, rerum doloribus, ratione veniam, maiores ipsa hic
        </p>
        <Link to="/">
          <button className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 duration-300">
            Back
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Menu;
