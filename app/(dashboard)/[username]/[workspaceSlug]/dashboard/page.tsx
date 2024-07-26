export default function OverviewPage({
  params,
}: Readonly<{
  params: {
    username: string;
    workspaceSlug: string;
  };
}>) {
  return (
    <div>
      <h1>
        {params.username}/{params.workspaceSlug}
      </h1>
    </div>
  );
}
