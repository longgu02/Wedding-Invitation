import Image from "next/image";
import { invitation } from "@/lib/invitationData";

function BankCard({
  sideLabel,
  bankName,
  accountName,
  accountNumber,
  qr,
}: {
  sideLabel: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  qr: string;
}) {
  const hasText = bankName || accountName || accountNumber;
  const hasInfo = hasText || qr;

  return (
    <div className="flex flex-1 flex-col items-center rounded-3xl bg-wheat px-6 py-8 text-center shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5">
      <p className="font-serif text-lg tracking-widest text-olive uppercase">{sideLabel}</p>

      {hasText && (
        <div className="mt-4 space-y-1 text-sm text-ink/80">
          {bankName && <p>{bankName}</p>}
          {accountName && <p>{accountName}</p>}
          {accountNumber && <p className="font-medium">{accountNumber}</p>}
        </div>
      )}

      {qr && (
        <>
          <div className="mt-5 overflow-hidden rounded-2xl bg-white p-2 shadow-sm ring-1 ring-olive/10">
            <Image
              src={qr}
              alt={`Mã QR mừng cưới ${sideLabel}`}
              width={220}
              height={220}
              className="h-44 w-44 object-contain sm:h-52 sm:w-52"
            />
          </div>
          <p className="mt-3 text-xs tracking-wide text-ink-soft">
            {invitation.labels.qrScanText}
          </p>
          <a
            href={qr}
            download
            className="mt-2 text-xs font-medium text-olive underline-offset-2 hover:underline"
          >
            {invitation.labels.saveQR}
          </a>
        </>
      )}

      {!hasInfo && <p className="mt-4 text-sm italic text-ink/40">Chưa cập nhật thông tin</p>}
    </div>
  );
}

export default function GiftBox() {
  if (!invitation.flags.showBank) return null;
  const { gift } = invitation;

  return (
    <section className="py-12 text-center sm:py-16">
      <p className="font-serif text-lg font-medium tracking-[0.3em] text-olive uppercase sm:text-xl">
        {invitation.labels.giftBox}
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm text-ink/70">
        {invitation.labels.giftBoxThankYou}
      </p>

      <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-6 sm:flex-row">
        <BankCard
          sideLabel={invitation.groom.sideLabel}
          bankName={gift.groomBankName}
          accountName={gift.groomBankAccountName}
          accountNumber={gift.groomBankAccountNumber}
          qr={gift.groomBankQr}
        />
        <BankCard
          sideLabel={invitation.bride.sideLabel}
          bankName={gift.brideBankName}
          accountName={gift.brideBankAccountName}
          accountNumber={gift.brideBankAccountNumber}
          qr={gift.brideBankQr}
        />
      </div>
    </section>
  );
}
