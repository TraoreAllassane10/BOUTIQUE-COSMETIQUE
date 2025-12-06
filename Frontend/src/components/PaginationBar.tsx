import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type Dispatch, type SetStateAction } from "react";

interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  image: string;
  category: {
    id: number;
    nom: string;
  };
}

interface Data {
  data: Produit[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
}

const PaginationBar = ({
  currentPage,
  setCurrentPage,
  totalPage,
}: Data) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
            className="cursor-pointer"
          />
        </PaginationItem>

        {Array.from({length: totalPage}).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className="cursor-pointer"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPage && setCurrentPage(currentPage + 1)
            }
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
