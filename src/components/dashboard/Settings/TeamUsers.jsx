import { useState } from "react";
import { Icon } from "@iconify/react";
import useStore from "../../../state/store";

const TeamUsers = () => {
	const { settings, updateSettings } = useStore();
	const teamMembers = settings.teamMembers || [];
	const [isAdding, setIsAdding] = useState(false);
	const [newMember, setNewMember] = useState({
		name: "",
		email: "",
		role: "Viewer",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [toast, setToast] = useState(null);

	const showToast = (message, type = "success") => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3000);
	};

	const handleAddMember = async () => {
		if (!newMember.name || !newMember.email) {
			showToast("Please fill in all fields", "error");
			return;
		}

		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const currentMembers = settings.teamMembers || [];
		const newId = Math.max(...currentMembers.map((m) => m.id), 0) + 1;
		const member = {
			...newMember,
			id: newId,
			avatar: null,
			status: "Active",
		};

		updateSettings("teamMembers", [...currentMembers, member]);
		setIsLoading(false);
		setIsAdding(false);
		setNewMember({ name: "", email: "", role: "Viewer" });
		showToast("Team member added successfully");
	};

	const handleRemoveMember = (id) => {
		if (
			confirm("Are you sure you want to remove this team member?")
		) {
			const updatedMembers = teamMembers.filter((m) => m.id !== id);
			updateSettings("teamMembers", updatedMembers);
			showToast("Team member removed");
		}
	};

	const handleRoleChange = (id, newRole) => {
		const updatedMembers = teamMembers.map((m) =>
			m.id === id ? { ...m, role: newRole } : m
		);
		updateSettings("teamMembers", updatedMembers);
		showToast("Role updated");
	};

	return (
		<div className='p-6 max-w-4xl'>
			{toast && (
				<div
					className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
						toast.type === "error" ? "bg-red-500" : "bg-green-500"
					} transition-opacity items-center flex gap-2 z-50`}
				>
					<Icon
						icon={
							toast.type === "error"
								? "mdi:alert-circle"
								: "mdi:check-circle"
						}
					/>
					{toast.message}
				</div>
			)}

			<div className='flex justify-between items-center mb-8'>
				<div>
					<h2 className='text-2xl font-bold text-gray-800'>
						Team & Users
					</h2>
					<p className='text-gray-500'>
						Manage your team members and their permissions.
					</p>
				</div>
				<button
					onClick={() => setIsAdding(true)}
					className='flex items-center gap-2 px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-opacity-90 transition-colors'
				>
					<Icon icon='mdi:plus' />
					Add Member
				</button>
			</div>

			{/* Add Member Form */}
			{isAdding && (
				<div className='mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm animate-fade-in'>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-lg font-semibold'>Add New Member</h3>
						<button
							onClick={() => setIsAdding(false)}
							className='text-gray-400 hover:text-gray-600'
						>
							<Icon icon='mdi:close' className='text-xl' />
						</button>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Name
							</label>
							<input
								type='text'
								value={newMember.name}
								onChange={(e) =>
									setNewMember({ ...newMember, name: e.target.value })
								}
								className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent outline-none'
								placeholder='John Doe'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Email
							</label>
							<input
								type='email'
								value={newMember.email}
								onChange={(e) =>
									setNewMember({
										...newMember,
										email: e.target.value,
									})
								}
								className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent outline-none'
								placeholder='john@example.com'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Role
							</label>
							<select
								value={newMember.role}
								onChange={(e) =>
									setNewMember({ ...newMember, role: e.target.value })
								}
								className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent outline-none'
							>
								<option value='Viewer'>Viewer</option>
								<option value='Editor'>Editor</option>
								<option value='Admin'>Admin</option>
							</select>
						</div>
					</div>
					<div className='flex justify-end gap-3'>
						<button
							onClick={() => setIsAdding(false)}
							className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
						>
							Cancel
						</button>
						<button
							onClick={handleAddMember}
							disabled={isLoading}
							className='px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-opacity-90 flex items-center gap-2'
						>
							{isLoading && <Icon icon='eos-icons:loading' />}
							{isLoading ? "Adding..." : "Add Member"}
						</button>
					</div>
				</div>
			)}

			{/* Members List */}
			<div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='w-full text-left min-w-[600px]'>
						<thead className='bg-gray-50 border-b border-gray-200'>
							<tr>
								<th className='px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>
									User
								</th>
								<th className='px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>
									Role
								</th>
								<th className='px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>
									Status
								</th>
								<th className='px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{teamMembers.length > 0 ? (
								teamMembers.map((member) => (
									<tr
										key={member.id}
										className='hover:bg-gray-50 transition-colors'
									>
										<td className='px-6 py-4'>
											<div className='flex items-center gap-3'>
												<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg'>
													{member.avatar ? (
														<img
															src={member.avatar}
															alt={member.name}
															className='w-full h-full rounded-full object-cover'
														/>
													) : (
														member.name.charAt(0)
													)}
												</div>
												<div>
													<p className='font-semibold text-gray-800'>
														{member.name}
													</p>
													<p className='text-sm text-gray-500'>
														{member.email}
													</p>
												</div>
											</div>
										</td>
										<td className='px-6 py-4'>
											<select
												value={member.role}
												onChange={(e) =>
													handleRoleChange(member.id, e.target.value)
												}
												className='bg-white border border-gray-200 text-gray-700 text-sm rounded-lg block p-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer hover:bg-gray-50'
											>
												<option value='Admin'>Admin</option>
												<option value='Editor'>Editor</option>
												<option value='Viewer'>Viewer</option>
											</select>
										</td>
										<td className='px-6 py-4'>
											<span
												className={`px-2 py-1 text-xs font-semibold rounded-full ${
													member.status === "Active"
														? "bg-green-100 text-green-700"
														: "bg-gray-100 text-gray-600"
												}`}
											>
												{member.status || "Active"}
											</span>
										</td>
										<td className='px-6 py-4 text-right'>
											<button
												onClick={() => handleRemoveMember(member.id)}
												className='text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50'
												title='Remove Member'
											>
												<Icon
													icon='mdi:trash-can-outline'
													className='text-xl'
												/>
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan='4'
										className='px-6 py-8 text-center text-gray-500'
									>
										No team members found. Add someone to collaborate!
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TeamUsers;
