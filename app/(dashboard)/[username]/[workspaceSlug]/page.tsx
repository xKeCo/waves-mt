type TDashboardParams = {
  params: {
    username: string;
    workspaceKey: string;
  };
};

export default function MainPage({ params }: Readonly<TDashboardParams>) {
  return (
    <div>
      <h1>Dashboard {params.username}</h1>
    </div>
  );
}
