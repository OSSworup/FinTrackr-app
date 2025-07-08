import { FaList, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import FeatureCard from "../FeatureCard/index";

function Features() {
  return (
    <section className="relative z-10 -mt-8 pt-6 px-8 py-12 bg-white">
      <div className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<FaList />}
          title="Track Transactions"
          description="Stay on top of your spending with detailed transaction tracking."
        />
        <FeatureCard
          icon={<FaCalendarAlt />}
          title="Manage Recurring Payments"
          description="Never miss a bill. Handle subscriptions and bills with ease."
        />
        <FeatureCard
          icon={<FaChartLine />}
          title="Forecast Your Finances"
          description="Visualize your future expenses and savings."
        />
      </div>
    </section>
  );
}

export default Features;