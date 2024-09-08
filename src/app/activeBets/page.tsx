import ActiveBets from "@/components/Bet/ActiveBets";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const activeBets = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Active-Bets" />
        <ActiveBets />
      </div>
    </DefaultLayout>
  );
};

export default activeBets;
