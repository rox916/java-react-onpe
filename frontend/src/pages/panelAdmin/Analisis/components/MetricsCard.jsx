// src/pages/panelAdmin/Analisis/components/DatasetPreview.jsx

const DatasetPreview = () => {
  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">Vista previa del dataset</h3>
      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Departamento</th>
            <th className="border px-3 py-2">Provincia</th>
            <th className="border px-3 py-2">Votos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-3 py-1">Lima</td>
            <td className="border px-3 py-1">Lima</td>
            <td className="border px-3 py-1">45200</td>
          </tr>
          <tr>
            <td className="border px-3 py-1">Cusco</td>
            <td className="border px-3 py-1">Urubamba</td>
            <td className="border px-3 py-1">18000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DatasetPreview; // 👈 ESTE EXPORT ES CLAVE
