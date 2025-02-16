import { Button } from "./components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton>
            <Button className="cursor-pointer">Iniciar Sesión</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <h1 className="text-2xl text-red-400">Hola Mundo</h1>
    </>
  );
}

export default App;
