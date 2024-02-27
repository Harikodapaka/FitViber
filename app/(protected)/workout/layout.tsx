interface WorkoutLayoutProps {
	children: React.ReactNode;
}

const WorkoutLayout = ({ children }: WorkoutLayoutProps) => {
	return <div className="container">{children}</div>;
};

export default WorkoutLayout;
