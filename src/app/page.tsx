

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-5">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Welcome to the Family Website!
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Sign in to view recipes or browse the collection.
        </p>
        <div className="pt-4">
          <a 
            href="/protected/recipes" 
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-all"
          >
            View Recipes
          </a>
        </div>
      </div>
    </main>
  );
}
