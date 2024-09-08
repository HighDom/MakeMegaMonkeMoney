import JoinBets from "@/components/Bet/JoinBets";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const joinBets = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Active-Bets" />
        <JoinBets />
      </div>
    </DefaultLayout>
  );
};

export default joinBets;
