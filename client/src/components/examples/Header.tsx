import { ThemeProvider } from "../ThemeProvider";
import { Header as HeaderComponent } from "../Header";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <HeaderComponent />
      </div>
    </ThemeProvider>
  );
}
