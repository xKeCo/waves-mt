type TDashboardParams = {
  params: {
    username: string;
  };
};

export default function page({ params }: TDashboardParams) {
  return (
    <div>
      <h1>Dashboard {params.username}</h1>
    </div>
  );
}
