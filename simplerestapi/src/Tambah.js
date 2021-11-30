import { useNavigate } from 'react-router-dom';

const Tambah = ({ url }) => {
	const navigate = useNavigate();
	
	return (
		<div>
			<p className="text-2xl text-green-500">Tambah</p>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(-1)}>Back</button>
		</div>
	)
}
export default Tambah;