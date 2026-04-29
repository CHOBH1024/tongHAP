import { Outlet, createRootRoute, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#f2f4f6] flex items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-md">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ca8a04] to-[#1e1b4b] leading-none">
          404
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            요청하신 경로가 존재하지 않거나 이동되었습니다.<br />
            아래 버튼을 통해 홈으로 돌아가세요.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e1b4b] text-white font-bold rounded-2xl hover:bg-[#2d2a5e] active:scale-95 transition-all shadow-lg"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  ),
});
